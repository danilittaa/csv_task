import React, { useState } from "react";

import Papa from "papaparse";
import { Button, Snackbar, Alert } from "@mui/material";
import { Table } from "../components";
import { CellTypes } from "../../enums/enums";

const CsvUploader: React.FC = () => {
  const [csvData, setCsvData] = useState<[][]>([]);
  const [headers, setHeaders] = useState<[]>([]);
  const [errorSnackbarText, setErrorSnackbarText] = useState("");
  const [fileKey, setFileKey] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileKey(Date.now());
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const data = result.data;

          if (result.errors && result.errors.length > 0) {
            setErrorSnackbarText("File format is not correct");
            return;
          }

          const headers = (data[0] as []).map((header: string) =>
            header.toLowerCase()
          );

          if (
            !headers.includes(CellTypes.FULL_NAME) ||
            !headers.includes(CellTypes.EMAIL) ||
            !headers.includes(CellTypes.PHONE)
          ) {
            setErrorSnackbarText("Full Name, Email, Phone fields are required");
            return;
          }
          setHeaders(headers as []);
          setCsvData(data.slice(1) as [][]);
        },
      });
    }
  };

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        key={fileKey} // added it so that when I want to open the same file again, all the checks
        //work again, because browsers cache files by default
      />

      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Завантажити файл
        </Button>
      </label>
      <Table data={csvData} headers={headers} />
      <Snackbar
        open={!!errorSnackbarText}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert onClose={handleCloseErrorSnackbar} severity="error">
          {errorSnackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export { CsvUploader };
