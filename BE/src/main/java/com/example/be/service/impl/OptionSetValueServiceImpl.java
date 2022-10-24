package com.example.be.service.impl;

import com.example.be.entity.OptionSet;
import com.example.be.entity.OptionSetValue;
import com.example.be.exception.ResourceNotFoundException;
import com.example.be.exception.UniqueFieldException;
import com.example.be.helper.ExcelHelper;
import com.example.be.repository.OptionSetValueRepository;
import com.example.be.service.IOptionSetValueService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class OptionSetValueServiceImpl implements IOptionSetValueService {

    private final OptionSetValueRepository optionSetValueRepository;

    public OptionSetValueServiceImpl(OptionSetValueRepository optionSetValueRepository) {
        this.optionSetValueRepository = optionSetValueRepository;
    }


    @Override
    public List<OptionSetValue> getAllOptionSetValueById(Integer id) {
        return optionSetValueRepository.getAllOptionSetValueById(id);
    }

    @Override
    public OptionSetValue get(Integer id) {
        return null;
    }

    @Override
    public List<OptionSetValue> search(Integer idOptionSet, String name, String code, Integer[] status) {
        if (status.length < 1) {
            status = new Integer[]{1, 0};
        }
        return optionSetValueRepository.search(idOptionSet, name, code, status);
    }

    @Override
    public OptionSetValue save(OptionSetValue optionSetValue) {

        optionSetValueRepository.findByCode(optionSetValue.getCode()).ifPresent(o -> {
            throw new UniqueFieldException(optionSetValue.getCode() + " already existed!");
        });

        optionSetValue.setCreator("ADMIN");
        optionSetValue.setCreatedDate(new Date());
        optionSetValue.setUpdatedDate(new Date());
        optionSetValue.setStatus(1);
        return optionSetValueRepository.save(optionSetValue);
    }

    @Override
    public OptionSetValue update(OptionSetValue optionSetValue, Integer id) {
        OptionSetValue optionSetValueById = optionSetValueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Id not found: " + id));

        optionSetValue.setCreatedDate(optionSetValueById.getCreatedDate());
        optionSetValue.setUpdatedDate(new Date());
        return optionSetValueRepository.save(optionSetValue);
    }

    @Override
    public void saveToExcel(MultipartFile file) {
        try {
            List<OptionSetValue> optionSetValueList = ExcelHelper.excelToOptionSetValue(file.getInputStream());
            optionSetValueRepository.saveAll(optionSetValueList);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }

    @Override
    public ByteArrayInputStream loadExcel() {
        List<OptionSetValue> optionSetValueList = optionSetValueRepository.findAll();
        ByteArrayInputStream byteArrayInputStream = ExcelHelper.optionSetValuesToExcel(optionSetValueList);
        return byteArrayInputStream;
    }
}
