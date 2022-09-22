package com.example.nodotrainingbe.controller;

import com.example.nodotrainingbe.entity.TacGia;
import com.example.nodotrainingbe.service.TacGiaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/tacgia")
public class TacGiaController {

    private final TacGiaService tacGiaService;

    public TacGiaController(TacGiaService tacGiaService) {
        this.tacGiaService = tacGiaService;
    }

    @GetMapping
    public ResponseEntity<List<TacGia>> getAll() {
        return new ResponseEntity<>(tacGiaService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<TacGia> get(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(tacGiaService.get(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TacGia> save(@RequestBody TacGia tacGia) {
        return new ResponseEntity<>(tacGiaService.save(tacGia), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<TacGia> update(@RequestBody TacGia tacGia, @PathVariable("id") Integer id) {
        return new ResponseEntity<>(tacGiaService.update(tacGia, id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id) {
        tacGiaService.delete(id);
    }
}
