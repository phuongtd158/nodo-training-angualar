package com.example.nodotrainingbe.controller;

import com.example.nodotrainingbe.entity.NhaXuatBan;
import com.example.nodotrainingbe.service.NhaXuatBanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/nxb")
public class NhaXuatBanController {

    private final NhaXuatBanService nhaXuatBanService;

    public NhaXuatBanController(NhaXuatBanService nhaXuatBanService) {
        this.nhaXuatBanService = nhaXuatBanService;
    }

    @GetMapping
    public ResponseEntity<List<NhaXuatBan>> getAll() {
        return new ResponseEntity<>(nhaXuatBanService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<NhaXuatBan> get(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(nhaXuatBanService.get(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<NhaXuatBan> save(@RequestBody NhaXuatBan nhaXuatBan) {
        return new ResponseEntity<>(nhaXuatBanService.save(nhaXuatBan), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<NhaXuatBan> update(@RequestBody NhaXuatBan nhaXuatBan) {
        return new ResponseEntity<>(nhaXuatBanService.update(nhaXuatBan), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id) {
        nhaXuatBanService.delete(id);
    }
}
