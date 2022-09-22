package com.example.nodotrainingbe.service.impl;

import com.example.nodotrainingbe.entity.NhaXuatBan;
import com.example.nodotrainingbe.entity.TacGia;
import com.example.nodotrainingbe.exception.ExistException;
import com.example.nodotrainingbe.exception.ResourceNotFoundException;
import com.example.nodotrainingbe.repository.TacGiaRepository;
import com.example.nodotrainingbe.service.TacGiaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TacGiaServiceImpl implements TacGiaService {

    private final TacGiaRepository tacGiaRepository;

    public TacGiaServiceImpl(TacGiaRepository tacGiaRepository) {
        this.tacGiaRepository = tacGiaRepository;
    }

    @Override
    public TacGia save(TacGia tacGia) {
        Optional<TacGia> byMaTacGia = tacGiaRepository.findTacGiaByMaTacGiaEquals(tacGia.getMaTacGia());
        List<TacGia> list = getAll();
        if (byMaTacGia.isPresent()) {
            throw new ExistException("Tác giả có mã " + tacGia.getMaTacGia() + " đã tồn tại ");
        }
        if (list.size() == 0) {
            tacGia.setMaTacGia(1);
        } else {
            tacGia.setMaTacGia(list.get(list.size() - 1).getMaTacGia() + 1);
        }
        return tacGiaRepository.save(tacGia);
    }

    @Override
    public TacGia get(Integer id) {
        return tacGiaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả có mã: " + id));
    }

    @Override
    public List<TacGia> getAll() {
        return tacGiaRepository.findAll();
    }

    @Override
    public TacGia update(TacGia tacGia, Integer id) {
        tacGiaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả có mã: " + id));
        return tacGiaRepository.save(tacGia);
    }

    @Override
    public void delete(Integer id) {
        tacGiaRepository.deleteById(id);
    }
}
