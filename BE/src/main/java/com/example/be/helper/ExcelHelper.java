package com.example.be.helper;

import com.example.be.entity.OptionSetValue;
import com.example.be.repository.OptionSetRepository;
import com.example.be.repository.OptionSetValueRepository;
import com.example.be.service.IOptionSetService;
import com.example.be.service.impl.OptionSetServiceImpl;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelHelper {

    @Autowired
    private IOptionSetService optionSetService;

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Id", "Code", "Name", "Group", "EffectiveDate", "ExpirationDate", "Status", "CreatedDate", "Creator", "UpdatedDate"};
    static String SHEET = "Loại danh mục";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public static ByteArrayInputStream optionSetValuesToExcel(List<OptionSetValue> optionSetValueList) {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (OptionSetValue optionSetValue : optionSetValueList) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(optionSetValue.getId());
                row.createCell(1).setCellValue(optionSetValue.getCode());
                row.createCell(2).setCellValue(optionSetValue.getName());
                row.createCell(3).setCellValue(optionSetValue.getGroup());
                row.createCell(4).setCellValue(optionSetValue.getEffectiveDate());
                row.createCell(5).setCellValue(optionSetValue.getExpirationDate());
                row.createCell(6).setCellValue(optionSetValue.getStatus());
                row.createCell(7).setCellValue(optionSetValue.getCreatedDate());
                row.createCell(8).setCellValue(optionSetValue.getCreator());
                row.createCell(9).setCellValue(optionSetValue.getUpdatedDate());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    public static List<OptionSetValue> excelToOptionSetValue(InputStream is) {

        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();

            List<OptionSetValue> optionSetValues = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellsInRow = currentRow.iterator();

                OptionSetValue optionSetValue = new OptionSetValue();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();

                    switch (cellIdx) {
                        case 0:
                            optionSetValue.setCode(currentCell.getStringCellValue());
                            break;
                        case 1:
//                            optionSetValue.setOptionSet();
                            break;
                        case 2:
                            optionSetValue.setName(currentCell.getStringCellValue());
                            break;
                        case 3:
                            optionSetValue.setGroup(currentCell.getStringCellValue());
                            break;
                        case 4:
                            optionSetValue.setEffectiveDate(currentCell.getDateCellValue());
                            break;
                        case 5:
                            optionSetValue.setExpirationDate(currentCell.getDateCellValue());
                            break;
                        case 6:
                            optionSetValue.setStatus((int) currentCell.getNumericCellValue());
                            break;
                        case 7:
                            optionSetValue.setCreatedDate(currentCell.getDateCellValue());
                            break;
                        case 8:
                            optionSetValue.setCreator(currentCell.getStringCellValue());
                            break;
                        case 9:
                            optionSetValue.setUpdatedDate(currentCell.getDateCellValue());
                            break;
                        default:
                            break;
                    }
                    cellIdx++;
                }
                optionSetValues.add(optionSetValue);
            }

            workbook.close();

            return optionSetValues;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}
