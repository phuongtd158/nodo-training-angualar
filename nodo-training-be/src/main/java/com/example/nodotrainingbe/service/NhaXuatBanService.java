package com.example.nodotrainingbe.service;

import com.example.nodotrainingbe.entity.NhaXuatBan;

import java.util.List;

public interface NhaXuatBanService {
    NhaXuatBan save(NhaXuatBan nhaXuatBan);

    NhaXuatBan get(Integer id);

    List<NhaXuatBan> getAll();

    NhaXuatBan update(NhaXuatBan nhaXuatBan);

    void delete(Integer id);
}
