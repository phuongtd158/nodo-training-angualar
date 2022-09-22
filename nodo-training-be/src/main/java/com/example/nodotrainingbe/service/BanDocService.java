package com.example.nodotrainingbe.service;

import com.example.nodotrainingbe.entity.BanDoc;

import java.util.List;

public interface BanDocService {
    BanDoc save(BanDoc banDoc);

    BanDoc get(Integer id);

    List<BanDoc> getAll();

    BanDoc update(BanDoc banDoc);

    void delete(Integer id);
}
