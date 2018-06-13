(* Mathematica Test File    *)
(* Created by Mathematica Plugin for IntelliJ IDEA *)

BeginTestSection["test3.mt"]

VerificationTest[{}[[1]], {}[[1]], TestID -> "TestMissingMessage"];
VerificationTest[{}[[1]], {}[[1]], {Part::partw}, TestID -> "TestWithCorrectMessage"];
VerificationTest[{}[[1]], {}[[2]], {Part::partw}, TestID -> "TestWithCorrectMessage"];

EndTestSection[]
