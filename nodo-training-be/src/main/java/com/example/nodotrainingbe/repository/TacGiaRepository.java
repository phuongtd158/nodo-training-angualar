package com.example.nodotrainingbe.repository;

import com.example.nodotrainingbe.entity.TacGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TacGiaRepository extends JpaRepository<TacGia, Integer> {
    Optional<TacGia> findTacGiaByMaTacGiaEquals(Integer maTacGia);

    @Query("select s from TacGia s order by s.maTacGia asc")
    List<TacGia> findAll();
}