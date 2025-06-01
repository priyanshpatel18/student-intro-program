# Anchor PDAs and Accounts

PDAs store data, at addresses specified by the onchain programmer, using a list of seeds, a bump seed, and a program ID.

## Devnet Program

[View on Explorer](https://explorer.solana.com/address/9wCahzNLUJpCptqX4fE9dTWDiLqiezXe2E6zMdvMdRqQ?cluster=devnet)

## Program Breakdown

### Use PDAs with the `init` constraint

You can combine the seeds and bump constraints with the init constraint to initialize an account using a PDA.

```rs
#[derive(Accounts)]
pub struct CreateStudentIntro<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init_if_needed,
        payer = signer,
        space = DISCRIMINATOR + StudentIntro::INIT_SPACE,
        seeds = [b"intro", signer.key().as_ref()],
        bump
    )]
    pub student_intro: Account<'info, StudentIntro>,

    pub system_program: Program<'info, System>,
}
```

### Use the `#[instruction(...)]` attribute macro

It let's you write a Solana program function that processes a specific instruction with parameters.

```rs
#[derive(Accounts)]
#[instruction(name: String, bio: String)]
pub struct UpdateStudentIntro<'info> {
    #[account(
        mut,
        seeds = [b"intro", signer.key().as_ref()],
        bump,
        realloc = DISCRIMINATOR + StudentIntro::INIT_SPACE + name.len() + bio.len() + 8,
        realloc::payer = signer,
        realloc::zero = false,
    )]
    pub student_intro: Account<'info, StudentIntro>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
```

### `init_if_needed` constraint

Anchor provides an init_if_needed constraint that can be used to initialize an account if the account has not already been initialized.

### `realloc` constraint

The `realloc` constraint provides a simple way to reallocate space for existing accounts.

```rs
#[derive(Accounts)]
#[instruction(name: String, bio: String)]
pub struct UpdateStudentIntro<'info> {
    #[account(
        mut,
        seeds = [b"intro", signer.key().as_ref()],
        bump,
        realloc = DISCRIMINATOR + StudentIntro::INIT_SPACE + name.len() + bio.len() + 8,
        realloc::payer = signer,
        realloc::zero = false,
    )]
    pub student_intro: Account<'info, StudentIntro>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
```

### `close` constraint

The `close` constraint provides a simple and secure way to close an existing account.

```rs
#[derive(Accounts)]
pub struct DeleteStudentIntro<'info> {
    #[account(
        mut,
        seeds = [b"intro", signer.key().as_ref()],
        bump,
        close = signer
    )]
    pub student_intro: Account<'info, StudentIntro>,

    #[account(mut)]
    pub signer: Signer<'info>,
}
```
## Installation

1. Clone the repository
```bash
git clone https://github.com/priyanshpatel18/student-intro-program.git
cd student-intro-program
```

2. Start local Solana validator:
```bash
solana-test-validator
```

3. Build the program
```bash
anchor build
```
4. Deploy the program
```bash
anchor deploy --provider.cluster localnet
```

5. Run the tests
```bash
anchor test --skip-local-validator --skip-deploy
```

## Key Takeaways
- The `seeds` and `bump` constraints are used to initialize and validate PDA accounts in Anchor
- - The `init_if_needed` constraint is used to conditionally initialize a new account
- The `realloc` constraint is used to reallocate space on an existing account
- The `close` constraint is used to close an account and refund its rent
