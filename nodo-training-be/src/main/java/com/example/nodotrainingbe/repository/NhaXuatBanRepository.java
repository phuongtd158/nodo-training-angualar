package com.example.nodotrainingbe.repository;

import com.example.nodotrainingbe.entity.NhaXuatBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NhaXuatBanRepository extends JpaRepository<NhaXuatBan, Integer> {
    @Query("select s from NhaXuatBan s order by s.maNxb asc")
    List<NhaXuatBan> findAll();
}