package com.example.be.controller;

import com.example.be.entity.OptionSetValue;
import com.example.be.helper.ExcelHelper;
import com.example.be.service.IOptionSetValueService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/option-set-value")
public class OptionSetValueController {

    private final IOptionSetValueService optionSetValueService;

    public OptionSetValueController(IOptionSetValueService optionSetValueService) {
        this.optionSetValueService = optionSetValueService;
    }

//    @GetMapping("{id}")
//    public ResponseEntity<OptionSetValue> get(@PathVariable("id") Integer id) {
//        return new ResponseEntity<>(optionSetValueService.get(id), HttpStatus.OK);
//    }

    @GetMapping("{id}")
    public ResponseEntity<List<OptionSetValue>> getAllOptionSetValueById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(optionSetValueService.getAllOptionSetValueById(id), HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity<List<OptionSetValue>> search(@RequestParam(value = "idOptionSet", defaultValue = "") Integer idOptionSet,
                                                       @RequestParam(value = "name", defaultValue = "") String name,
                                                       @RequestParam(value = "code", defaultValue = "") String code,
                                                       @RequestParam(value = "status", defaultValue = "") Integer[] status) {
        return new ResponseEntity<>(optionSetValueService.search(idOptionSet, name, code, status), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OptionSetValue> save(@RequestBody OptionSetValue optionSetValue) {
        return new ResponseEntity<>(optionSetValueService.save(optionSetValue), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<OptionSetValue> update(@PathVariable("id") Integer id, @RequestBody OptionSetValue optionSetValue) {
        return new ResponseEntity<>(optionSetValueService.update(optionSetValue, id), HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        if (ExcelHelper.hasExcelFormat(file)) {
            try {
                optionSetValueService.saveToExcel(file);
                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return new ResponseEntity<>(message, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return new ResponseEntity<>(message, HttpStatus.EXPECTATION_FAILED);
            }
        }
        message = "Please upload an excel file!";
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> getFile() {
        String filename = "tutorials.xlsx";
        InputStreamResource file = new InputStreamResource(optionSetValueService.loadExcel());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }
}
