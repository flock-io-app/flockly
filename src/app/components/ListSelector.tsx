import React, { useState } from "react";
import { Button } from "./Index";
function ListSelector() {
  return (
    <div className="flex flex-row space-x-4">
      <Button
        label="Trainers"
        onClick={() => {
          alert("clicked");
        }}
      />
      <Button
        label="Validators"
        onClick={() => {
          alert("clicked");
        }}
      />
    </div>
  );
}

export default ListSelector;
