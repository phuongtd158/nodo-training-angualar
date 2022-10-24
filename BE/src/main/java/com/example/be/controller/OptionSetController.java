package com.example.be.controller;

import com.example.be.entity.OptionSet;
import com.example.be.service.IOptionSetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/option-set")
public class OptionSetController {

    private final IOptionSetService optionSetService;

    public OptionSetController(IOptionSetService optionSetService) {
        this.optionSetService = optionSetService;
    }

    @GetMapping("{id}")
    public ResponseEntity<OptionSet> get(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(optionSetService.get(id), HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity<List<OptionSet>> search(@RequestParam(value = "name", defaultValue = "") String name,
                                                  @RequestParam(value = "code", defaultValue = "") String code,
                                                  @RequestParam(value = "status", defaultValue = "") Integer[] status) {
        return new ResponseEntity<>(optionSetService.search(name, code, status), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<OptionSet>> getAll() {
        return new ResponseEntity<>(optionSetService.getAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OptionSet> save(@RequestBody OptionSet optionSet) {
        return new ResponseEntity<>(optionSetService.save(optionSet), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<OptionSet> update(@PathVariable("id") Integer id, @RequestBody OptionSet optionSet) {
        return new ResponseEntity<>(optionSetService.update(optionSet, id), HttpStatus.OK);
    }

}
