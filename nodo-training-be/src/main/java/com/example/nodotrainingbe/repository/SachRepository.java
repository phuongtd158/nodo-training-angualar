package com.example.nodotrainingbe.repository;

import com.example.nodotrainingbe.entity.Sach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SachRepository extends JpaRepository<Sach, Integer> {
    Optional<Sach> findSachByMaSachEquals(Integer maSach);

    @Query("select s from Sach s order by s.maSach asc")
    List<Sach> findAll();
}