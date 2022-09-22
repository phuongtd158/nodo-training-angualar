package com.example.nodotrainingbe.service.impl;

import com.example.nodotrainingbe.entity.NhaXuatBan;
import com.example.nodotrainingbe.exception.ResourceNotFoundException;
import com.example.nodotrainingbe.repository.NhaXuatBanRepository;
import com.example.nodotrainingbe.service.NhaXuatBanService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NhaXuatBanServiceImpl implements NhaXuatBanService {

    private final NhaXuatBanRepository nhaXuatBanRepository;

    public NhaXuatBanServiceImpl(NhaXuatBanRepository nhaXuatBanRepository) {
        this.nhaXuatBanRepository = nhaXuatBanRepository;
    }

    @Override
    public NhaXuatBan save(NhaXuatBan nhaXuatBan) {
        List<NhaXuatBan> list = getAll();
        if (list.size() == 0) {
            nhaXuatBan.setMaNxb(1);
        } else {
            nhaXuatBan.setMaNxb(list.get(list.size() - 1).getMaNxb() + 1);
        }
        return nhaXuatBanRepository.save(nhaXuatBan);
    }

    @Override
    public NhaXuatBan get(Integer id) {
        return nhaXuatBanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhà xuất bản có mã: " + id));
    }

    @Override
    public List<NhaXuatBan> getAll() {
        return nhaXuatBanRepository.findAll();
    }

    @Override
    public NhaXuatBan update(NhaXuatBan nhaXuatBan) {
        return nhaXuatBanRepository.save(nhaXuatBan);
    }

    @Override
    public void delete(Integer id) {
        nhaXuatBanRepository.deleteById(id);
    }
}
