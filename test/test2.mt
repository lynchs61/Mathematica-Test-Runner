(* Mathematica Test File    *)
(* Created by Mathematica Plugin for IntelliJ IDEA *)

BeginTestSection["test2.mt"]

VerificationTest[(* 1 *)
  1 + 2, 2
];

VerificationTest[Cos[2 Pi], 1];

VerificationTest[{}[[1]], {}[[1]], TestID -> "TestMissingMessage"];
VerificationTest[{}[[1]], {}[[1]], {Part::partw}, TestID -> "TestWithCorrectMessage"];

EndTestSection[]
