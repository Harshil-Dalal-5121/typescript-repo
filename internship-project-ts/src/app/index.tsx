import React from "react";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import Translate from "./services/translate";
import Theme from "./services/theme";

function Root() {
  return (
    <Theme>
      <Translate>
        <RouterProvider router={router} />
      </Translate>
    </Theme>
  );
}

export default Root;
