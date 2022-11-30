import "i18next";

import { resources } from "../localization/localize";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["en"];
  }
}
