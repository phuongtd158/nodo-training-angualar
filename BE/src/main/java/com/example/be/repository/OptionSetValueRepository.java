package com.example.be.repository;

import com.example.be.entity.OptionSet;
import com.example.be.entity.OptionSetValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OptionSetValueRepository extends JpaRepository<OptionSetValue, Integer> {

    Optional<OptionSetValue> findByCode(String code);

    @Query("select o from OptionSetValue o where o.optionSet.id = :id")
    List<OptionSetValue> getAllOptionSetValueById(Integer id);

    @Query("select o from OptionSetValue o where (o.name like %:name% and o.code like %:code%) and o.status  in (:status) and o.optionSet.id =:idOptionSet")
    List<OptionSetValue> search(Integer idOptionSet, String name, String code, Integer[] status);
}