import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { StudentIntro } from "../target/types/student_intro";
import { expect } from "chai";

describe("student_intro", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.studentIntro as Program<StudentIntro>;

  const name = "Solana";
  const bio = "GM!!";

  const longName = "S".repeat(40);
  const longBio = "B".repeat(200);

  let studentIntroPda: anchor.web3.PublicKey;

  before(async () => {
    [studentIntroPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("intro"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Creates student intro successfully", async () => {
    await program.methods
      .createStudentIntro(name, bio)
      .rpc();

    const account = await program.account.studentIntro.fetch(studentIntroPda);
    expect(account.name).to.equal(name);
    expect(account.bio).to.equal(bio);
  });

  it("Fails to create student intro with name too long", async () => {
    try {
      await program.methods
        .createStudentIntro(longName, bio)
        .rpc();
      throw new Error("Should have failed due to long name");
    } catch (err: any) {
      expect(err.error.errorCode.code).to.equal("NameTooLong");
    }
  });

  it("Fails to create student intro with bio too long", async () => {
    try {
      await program.methods
        .createStudentIntro(name, longBio)
        .rpc();
      throw new Error("Should have failed due to long bio");
    } catch (err: any) {
      expect(err.error.errorCode.code).to.equal("BioTooLong");
    }
  });

  it("Updates student intro successfully", async () => {
    const newName = "Anchor";
    const newBio = "Learning Solana with Anchor!";

    await program.methods
      .updateStudentIntro(newName, newBio)
      .rpc();

    const account = await program.account.studentIntro.fetch(studentIntroPda);
    expect(account.name).to.equal(newName);
    expect(account.bio).to.equal(newBio);
  });

  it("Deletes student intro successfully", async () => {
    await program.methods
      .deleteStudentIntro()
      .rpc();

    try {
      await program.account.studentIntro.fetch(studentIntroPda);
      throw new Error("Account should have been closed");
    } catch (err: any) {
      expect(err.message).to.include("Account does not exist");
    }
  });
});
