package com.example.nodotrainingbe.service;

import com.example.nodotrainingbe.entity.MuonSach;

import java.util.List;

public interface MuonSachService {
    MuonSach save(MuonSach muonSach);

    MuonSach get(Integer id);

    List<MuonSach> getAll();

    MuonSach update(MuonSach muonSach);

    void delete(Integer id);
}
