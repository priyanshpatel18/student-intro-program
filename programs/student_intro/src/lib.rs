mod error;

use core::str;

use crate::error::LengthError;
use anchor_lang::prelude::*;

const DISCRIMINATOR: usize = 8;
pub const MAX_NAME_LENGTH: usize = 32;
pub const MAX_BIO_LENGTH: usize = 160;

declare_id!("9wCahzNLUJpCptqX4fE9dTWDiLqiezXe2E6zMdvMdRqQ");

#[program]
pub mod student_intro {
    use super::*;

    pub fn create_student_intro(
        ctx: Context<CreateStudentIntro>,
        name: String,
        bio: String,
    ) -> Result<()> {
        require!(name.len() <= MAX_NAME_LENGTH, LengthError::NameTooLong);
        require!(bio.len() <= MAX_BIO_LENGTH, LengthError::BioTooLong);

        let student_intro_account = &mut ctx.accounts.student_intro;
        student_intro_account.name = name;
        student_intro_account.bio = bio;

        msg!(
            "Student's Name: {} | Created Student's Bio: {}",
            student_intro_account.name,
            student_intro_account.bio
        );
        Ok(())
    }

    pub fn update_student_intro(
        ctx: Context<UpdateStudentIntro>,
        name: String,
        bio: String,
    ) -> Result<()> {
        require!(name.len() <= MAX_NAME_LENGTH, LengthError::NameTooLong);
        require!(bio.len() <= MAX_BIO_LENGTH, LengthError::BioTooLong);

        let student_intro_account = &mut ctx.accounts.student_intro;
        student_intro_account.name = name;
        student_intro_account.bio = bio;

        Ok(())
    }

    pub fn delete_student_intro(_ctx: Context<DeleteStudentIntro>) -> Result<()> {
        Ok(())
    }
}

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

#[account]
#[derive(InitSpace)]
pub struct StudentIntro {
    #[max_len(32)]
    pub name: String,

    #[max_len(160)]
    pub bio: String,
}
