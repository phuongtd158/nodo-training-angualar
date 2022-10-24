package com.example.be.service;

import com.example.be.entity.OptionSet;

import java.util.List;

public interface IOptionSetService {


    List<OptionSet> getAll();

    OptionSet get(Integer id);

    List<OptionSet> search(String name, String code, Integer[] status);

    OptionSet save(OptionSet optionSet);

    OptionSet update(OptionSet optionSet, Integer id);
}
