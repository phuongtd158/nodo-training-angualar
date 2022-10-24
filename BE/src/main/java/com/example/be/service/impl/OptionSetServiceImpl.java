package com.example.be.service.impl;

import com.example.be.entity.OptionSet;
import com.example.be.exception.ResourceNotFoundException;
import com.example.be.exception.UniqueFieldException;
import com.example.be.repository.OptionSetRepository;
import com.example.be.service.IOptionSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class OptionSetServiceImpl implements IOptionSetService {

    @Autowired
    private  OptionSetRepository optionSetRepository;

//    public OptionSetServiceImpl(OptionSetRepository optionSetRepository) {
//        this.optionSetRepository = optionSetRepository;
//    }

    @Override
    public OptionSet get(Integer id) {
        return optionSetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id not found: " + id));
    }

    @Override
    public List<OptionSet> getAll() {
        return optionSetRepository.findAll();
    }

    @Override
    public List<OptionSet> search(String name, String code, Integer[] status) {
        if (status.length < 1) {
            status = new Integer[]{1, 0};
        }
        return optionSetRepository.search(name, code, status);
    }

    @Override
    public OptionSet save(OptionSet optionSet) {

        optionSetRepository.findByCode(optionSet.getCode()).ifPresent(o -> {
            throw new UniqueFieldException(optionSet.getCode() + " already existed!");
        });

        optionSet.setCreator("ADMIN");
        optionSet.setCreatedDate(new Date());
        optionSet.setUpdatedDate(new Date());
        optionSet.setStatus(1);
        return optionSetRepository.save(optionSet);
    }

    @Override
    public OptionSet update(OptionSet optionSet, Integer id) {
        OptionSet option = optionSetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id not found: " + id));

        optionSet.setCreator(option.getCreator());
        optionSet.setCreatedDate(option.getCreatedDate());
        optionSet.setUpdatedDate(new Date());
        return optionSetRepository.save(optionSet);
    }
}
