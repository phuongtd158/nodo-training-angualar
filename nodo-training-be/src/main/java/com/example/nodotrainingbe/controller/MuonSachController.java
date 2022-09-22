package com.example.nodotrainingbe.controller;

import com.example.nodotrainingbe.entity.MuonSach;
import com.example.nodotrainingbe.service.MuonSachService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/muonsach")
public class MuonSachController {

    private final MuonSachService muonSachService;

    public MuonSachController(MuonSachService muonSachService) {
        this.muonSachService = muonSachService;
    }

    @GetMapping
    public ResponseEntity<List<MuonSach>> getAll() {
        return new ResponseEntity<>(muonSachService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<MuonSach> get(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(muonSachService.get(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MuonSach> save(@RequestBody MuonSach muonSach) {
        return new ResponseEntity<>(muonSachService.save(muonSach), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<MuonSach> update(@RequestBody MuonSach muonSach) {
        return new ResponseEntity<>(muonSachService.update(muonSach), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id) {
        muonSachService.delete(id);
    }
}
