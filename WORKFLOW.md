\# AI-Assisted Development Workflow Comparison



\## Overview



FE-02 compared two independent AI-assisted implementations of the same settings-form feature. Round One used a deliberately vague prompt: "Create a settings form for my app." Round Two used a detailed prompt with requirements, expected behavior, accessibility constraints, file inspection, a planning step, tests, and verification.



\## Round One



The first round was intentionally given minimal context. The resulting implementation was created with less explicit guidance about validation, accessibility, edge cases, and testing. The branch contains the basic application files, but the comparison shows that it did not establish the same dedicated validation and test structure found in Round Two.



\## Round Two



The second round produced a more structured implementation. The diff shows new `src/settingsForm.js` and `src/validateSettings.js` files, along with `test/settingsForm.test.js` and `test/validateSettings.test.js`. It also added `package-lock.json` and substantially reorganized the existing frontend files. The prompt explicitly required required-field validation, email validation, accessible labels, keyboard navigation, visible focus states, and tests followed by a verification step.



\## Correctness and Edge Cases



Round Two was more explicit about expected behavior. It required separate messages for missing names, missing emails, and invalid email formats, as well as a success state for valid submissions. This makes edge cases easier to verify than relying on a general request for a settings form.



\## Accessibility and Review Effort



Round Two explicitly required accessible labels, keyboard navigation, and visible focus states. These requirements reduce the chance that important accessibility details are forgotten. The dedicated validation and test files also make the implementation easier to review because the behavior is separated into smaller, testable pieces.



\## AI Mistake Caught



One important lesson from the comparison is that AI-generated code should not be accepted blindly. The first round demonstrates how a vague prompt can leave important requirements unspecified. In Round Two, the verification requirement forced the AI to create tests and review its implementation rather than simply producing code.



\## Conclusion



The detailed workflow requires more planning at the beginning, but it reduces ambiguity and makes correctness easier to verify. For future work, I will use an explore-plan-code-verify workflow, provide concrete requirements and expected behavior, and require tests for important functionality before considering an AI-generated feature complete.

