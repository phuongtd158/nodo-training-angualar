package com.example.nodotrainingbe.service;

import com.example.nodotrainingbe.entity.Sach;

import java.util.List;

public interface SachService {

    Sach save(Sach sach);

    Sach get(Integer id);

    List<Sach> getAll();

    Sach update(Sach sach);

    void delete(Integer id);

}
