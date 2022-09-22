package com.example.nodotrainingbe.service;

import com.example.nodotrainingbe.entity.TacGia;

import java.util.List;

public interface TacGiaService {
    TacGia save(TacGia tacGia);

    TacGia get(Integer id);

    List<TacGia> getAll();

    TacGia update(TacGia tacGia, Integer id);

    void delete(Integer id);
}
