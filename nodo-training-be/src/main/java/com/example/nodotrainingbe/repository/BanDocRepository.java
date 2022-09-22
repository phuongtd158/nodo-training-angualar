package com.example.nodotrainingbe.repository;

import com.example.nodotrainingbe.entity.BanDoc;
import com.example.nodotrainingbe.entity.TacGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BanDocRepository extends JpaRepository<BanDoc, Integer> {

    @Query("select s from BanDoc s order by s.maBanDoc asc")
    List<BanDoc> findAll();
}