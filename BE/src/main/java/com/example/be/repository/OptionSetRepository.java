package com.example.be.repository;

import com.example.be.entity.OptionSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OptionSetRepository extends JpaRepository<OptionSet, Integer> {
    Optional<OptionSet> findByCode(String code);

    @Query("select o from OptionSet o where (o.name like %:name% and o.code like %:code%) and o.status  in (:status)")
    List<OptionSet> search(String name, String code, Integer[] status);
}