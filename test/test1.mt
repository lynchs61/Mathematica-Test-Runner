(* Mathematica Test File    *)
(* Created by Mathematica Plugin for IntelliJ IDEA *)

BeginTestSection["test1.mt"]

VerificationTest[(* 1 *)
  1 + 1, 2,
  TestID -> "test1-1"
];

VerificationTest[
  Sin[Pi], 0,
  TestID -> "test1-2"
];

EndTestSection[]
