import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Main2() {

  return (
      <div class="container-fluid p-0">
        <div class="row mb-2 mb-xl-3">
          <div class="col-auto d-none d-sm-block">
            <h3>Group Schedule: </h3>
          </div>
          <div class="row justify-content-end">
            <div class="col-auto">
              <Button>Hello</Button>
            </div>
          </div>
        </div>
        <div class="row mb-2 mb-xl-3">
	        <Button>Hello</Button>
        </div>
      </div>
  );
}

export default Main2;