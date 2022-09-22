package com.example.nodotrainingbe.controller;

import com.example.nodotrainingbe.entity.Sach;
import com.example.nodotrainingbe.service.SachService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/sach")
public class SachController {

    private final SachService sachService;

    public SachController(SachService sachService) {
        this.sachService = sachService;
    }

    @GetMapping
    public ResponseEntity<List<Sach>> getAll() {
        return new ResponseEntity<>(sachService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Sach> get(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(sachService.get(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Sach> save(@RequestBody Sach sach) {
        return new ResponseEntity<>(sachService.save(sach), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Sach> update(@RequestBody Sach sach) {
        return new ResponseEntity<>(sachService.update(sach), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id) {
        sachService.delete(id);
    }

}
