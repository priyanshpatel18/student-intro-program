use anchor_lang::prelude::*;

#[error_code]
pub enum LengthError {
    #[msg("Name must be less than 32 characters")]
    NameTooLong,

    #[msg("Bio must be less than 160 characters")]
    BioTooLong,
}
