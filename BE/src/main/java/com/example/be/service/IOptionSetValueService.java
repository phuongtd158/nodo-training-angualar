package com.example.be.service;

import com.example.be.entity.OptionSetValue;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface IOptionSetValueService {

    List<OptionSetValue> getAllOptionSetValueById(Integer id);

    OptionSetValue get(Integer id);

    List<OptionSetValue> search(Integer idOptionSet, String name, String code, Integer[] status);

    OptionSetValue save(OptionSetValue optionSetValue);

    OptionSetValue update(OptionSetValue optionSetValue, Integer id);

    void saveToExcel(MultipartFile file);

    ByteArrayInputStream loadExcel();
}
