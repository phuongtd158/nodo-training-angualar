package com.example.nodotrainingbe.service.impl;

import com.example.nodotrainingbe.entity.BanDoc;
import com.example.nodotrainingbe.exception.ResourceNotFoundException;
import com.example.nodotrainingbe.repository.BanDocRepository;
import com.example.nodotrainingbe.service.BanDocService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BanDocServiceImpl implements BanDocService {

    private final BanDocRepository banDocRepository;

    public BanDocServiceImpl(BanDocRepository banDocRepository) {
        this.banDocRepository = banDocRepository;
    }

    @Override
    public BanDoc save(BanDoc banDoc) {
        List<BanDoc> list = getAll();
        if (list.size() == 0) {
            banDoc.setMaBanDoc(1);
        } else {
            banDoc.setMaBanDoc(list.get(list.size() - 1).getMaBanDoc() + 1);
        }
        return banDocRepository.save(banDoc);
    }

    @Override
    public BanDoc get(Integer id) {
        return banDocRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bạn đọc có mã: " + id));
    }

    @Override
    public List<BanDoc> getAll() {
        return banDocRepository.findAll();
    }

    @Override
    public BanDoc update(BanDoc banDoc) {
        return banDocRepository.save(banDoc);
    }

    @Override
    public void delete(Integer id) {
        banDocRepository.deleteById(id);
    }
}
