import React from "react";

import {
  Table as RNTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { AppColor, CellTypes } from "../../enums/enums";
import {
  formatLicenseStates,
  formatPhoneNumber,
  isValidAge,
  isValidExperience,
  isValidHasChildren,
  isValidLicenseNumber,
  isValidPhone,
  isValidYearlyIncome,
  isValidExpirationDate,
} from "../../helpers/helpers";
import { Header } from "./components/components";

type Properties = {
  data: [][];
  headers: string[];
};

type TableCell = {
  value: string;
  isValid: boolean;
};

type TableRow = {
  [key: string]: TableCell;
};

const Table: React.FC<Properties> = ({ data, headers }) => {
  const tableHeaders = ["Id", ...headers, "Duplicate with"];
  const uniqueEmails: Record<string, number> = {};
  const uniquePhones: Record<string, number> = {};

  const processedData = data.map((row, rowIndex) => {
    const processedRow: TableRow = {};

    processedRow[CellTypes.ID] = {
      value: (rowIndex + 1).toString(),
      isValid: true,
    };

    row.forEach((cell, index) => {
      const cellType = headers[index].toLowerCase();
      processedRow[cellType] = {
        value: (cell as string).trim(),
        isValid: true,
      };

      switch (cellType) {
        case CellTypes.AGE:
          processedRow[cellType].isValid = isValidAge(cell);
          break;
        case CellTypes.EXPERIENCE:
          processedRow[cellType].isValid = isValidExperience(
            cell,
            processedRow[CellTypes.AGE].value
          );
          break;
        case CellTypes.YEARLY_INCOME:
          processedRow[cellType].value = (+processedRow[cellType]
            .value).toFixed(2);
          processedRow[cellType].isValid = isValidYearlyIncome(cell);
          break;
        case CellTypes.HAS_CHILDREN:
          const currentCell = processedRow[cellType].value;
          processedRow[cellType].value = currentCell || "false";
          processedRow[cellType].isValid = isValidHasChildren(cell || "false");
          break;
        case CellTypes.EXPIRATION_DATE:
          processedRow[cellType].isValid = isValidExpirationDate(cell);
          break;
        case CellTypes.PHONE:
          const isValid = isValidPhone(cell);
          processedRow[cellType].isValid = isValid;
          if (isValid) {
            processedRow[cellType].value = formatPhoneNumber(cell);
          }
          break;
        case CellTypes.LICENSE_NUMBER:
          processedRow[cellType].isValid = isValidLicenseNumber(cell);
          break;
        case CellTypes.LICENSE_STATES:
          processedRow[cellType].value = formatLicenseStates(
            processedRow[cellType].value.split("|")
          );
      }
    });

    const emailColumnValue = (row[headers.indexOf(CellTypes.EMAIL)] as string)
      ?.toLowerCase()
      .trim();
    const phoneColumnValue = formatPhoneNumber(
      row[headers.indexOf(CellTypes.PHONE)] as string
    ).trim();

    if (uniqueEmails[emailColumnValue] !== undefined) {
      processedRow[CellTypes.DUPLICATE_WITH] = {
        value: (uniqueEmails[emailColumnValue] + 1).toString() + " (email)",
        isValid: false,
      };
    } else if (uniquePhones[phoneColumnValue] !== undefined) {
      processedRow[CellTypes.DUPLICATE_WITH] = {
        value: (uniquePhones[phoneColumnValue] + 1).toString() + " (phone)",
        isValid: false,
      };
    } else {
      uniqueEmails[emailColumnValue] = rowIndex;
      uniquePhones[phoneColumnValue] = rowIndex;
      processedRow[CellTypes.DUPLICATE_WITH] = {
        value: "-",
        isValid: true,
      };
    }
    return processedRow;
  });
  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <RNTable>
        <Header headers={tableHeaders} isVisible={!!processedData.length} />
        <TableBody>
          {processedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  style={{
                    backgroundColor: !cell.isValid
                      ? AppColor.RED_100
                      : rowIndex % 2
                      ? AppColor.WHITE
                      : AppColor.GREY_100,
                    textAlign: "center",
                  }}
                >
                  {cell.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </RNTable>
    </TableContainer>
  );
};

export { Table };
