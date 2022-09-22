package com.example.nodotrainingbe.controller;

import com.example.nodotrainingbe.entity.BanDoc;
import com.example.nodotrainingbe.service.BanDocService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/bandoc")
public class BanDocController {

    private final BanDocService banDocService;

    public BanDocController(BanDocService banDocService) {
        this.banDocService = banDocService;
    }

    @GetMapping
    public ResponseEntity<List<BanDoc>> getAll() {
        return new ResponseEntity<>(banDocService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<BanDoc> get(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(banDocService.get(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BanDoc> save(@RequestBody BanDoc banDoc) {
        return new ResponseEntity<>(banDocService.save(banDoc), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<BanDoc> update(@RequestBody BanDoc banDoc) {
        return new ResponseEntity<>(banDocService.update(banDoc), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id) {
        banDocService.delete(id);
    }
}
