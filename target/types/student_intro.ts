/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/student_intro.json`.
 */
export type StudentIntro = {
  "address": "9wCahzNLUJpCptqX4fE9dTWDiLqiezXe2E6zMdvMdRqQ",
  "metadata": {
    "name": "studentIntro",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createStudentIntro",
      "discriminator": [
        222,
        130,
        33,
        225,
        192,
        66,
        248,
        28
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "studentIntro",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  116,
                  114,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bio",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteStudentIntro",
      "discriminator": [
        195,
        203,
        135,
        230,
        193,
        77,
        83,
        59
      ],
      "accounts": [
        {
          "name": "studentIntro",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  116,
                  114,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "updateStudentIntro",
      "discriminator": [
        62,
        28,
        38,
        115,
        8,
        50,
        244,
        79
      ],
      "accounts": [
        {
          "name": "studentIntro",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  116,
                  114,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bio",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "studentIntro",
      "discriminator": [
        107,
        21,
        208,
        51,
        236,
        154,
        244,
        239
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameTooLong",
      "msg": "Name must be less than 32 characters"
    },
    {
      "code": 6001,
      "name": "bioTooLong",
      "msg": "Bio must be less than 160 characters"
    }
  ],
  "types": [
    {
      "name": "studentIntro",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          }
        ]
      }
    }
  ]
};
