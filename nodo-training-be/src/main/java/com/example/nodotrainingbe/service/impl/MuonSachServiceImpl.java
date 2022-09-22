package com.example.nodotrainingbe.service.impl;

import com.example.nodotrainingbe.entity.MuonSach;
import com.example.nodotrainingbe.entity.Sach;
import com.example.nodotrainingbe.exception.IsBeforeDateException;
import com.example.nodotrainingbe.exception.ResourceNotFoundException;
import com.example.nodotrainingbe.exception.TotalBookLimitException;
import com.example.nodotrainingbe.repository.MuonSachRepository;
import com.example.nodotrainingbe.repository.SachRepository;
import com.example.nodotrainingbe.service.MuonSachService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MuonSachServiceImpl implements MuonSachService {

    private final MuonSachRepository muonSachRepository;
    private final SachRepository sachRepository;

    public MuonSachServiceImpl(MuonSachRepository muonSachRepository, SachRepository sachRepository) {
        this.muonSachRepository = muonSachRepository;
        this.sachRepository = sachRepository;
    }

    @Override
    public MuonSach save(MuonSach muonSach) {
        Sach sach = sachRepository.findById(muonSach.getSach().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách có mã:  " + muonSach.getSach().getId()));

        if (muonSach.getSoLuong() > sach.getSoLuongConLai()) {
            throw new TotalBookLimitException("Số lượng sách mượn lớn hơn tổng số sách");
        }

        if (muonSach.getNgayGioTra().isBefore(muonSach.getNgayGioMuon())) {
            throw new IsBeforeDateException("Ngày giờ mượn phải trước ngày giờ trả");
        }

        int soLuongSachMuon = sach.getSoLuongSachMuon() + muonSach.getSoLuong();
        sach.setSoLuongSachMuon(soLuongSachMuon);
        sach.setSoLuongConLai(sach.getTongSoSach() - soLuongSachMuon);
        return muonSachRepository.save(muonSach);
    }

    @Override
    public MuonSach get(Integer id) {
        return muonSachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách có mã: " + id));
    }

    @Override
    public List<MuonSach> getAll() {
        return muonSachRepository.findAll();
    }

    @Override
    public MuonSach update(MuonSach muonSach) {
        Sach sach = sachRepository.findById(muonSach.getSach().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách có mã:  " + muonSach.getSach().getId()));
        MuonSach muonSachById = muonSachRepository.findById(muonSach.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mượn có mã:  " + muonSach.getId()));

        int soLuongMuonThem = muonSach.getSoLuong() - muonSachById.getSoLuong();
        if (soLuongMuonThem > sach.getSoLuongConLai()) {
            throw new TotalBookLimitException("Số lượng sách mượn lớn hơn tổng số sách");
        }

        if (muonSach.getNgayGioTra().isBefore(muonSach.getNgayGioMuon())) {
            throw new IsBeforeDateException("Ngày giờ mượn phải trước ngày giờ trả");
        }

        if (muonSach.getSoLuong() != muonSachById.getSoLuong()) {
            if (muonSach.getSoLuong() >= muonSachById.getSoLuong()) {
                int soLuongSachTang = muonSach.getSoLuong() - muonSachById.getSoLuong();
                sach.setSoLuongSachMuon(sach.getSoLuongSachMuon() + soLuongSachTang);
                sach.setSoLuongConLai(sach.getSoLuongConLai() - soLuongSachTang);
            } else {
                int soLuongSachGiam = muonSachById.getSoLuong() - muonSach.getSoLuong();
                sach.setSoLuongSachMuon(sach.getSoLuongSachMuon() - soLuongSachGiam);
                sach.setSoLuongConLai(sach.getSoLuongConLai() + soLuongSachGiam);
            }
            sachRepository.save(sach);
        }

        if (muonSach.getTrangThai() != muonSachById.getTrangThai()) {
            if (muonSach.getTrangThai() == 1) {
                sach.setSoLuongSachMuon(sach.getSoLuongSachMuon() + muonSach.getSoLuong());
                sach.setSoLuongConLai(sach.getSoLuongConLai() - muonSach.getSoLuong());
            } else {
                sach.setSoLuongSachMuon(sach.getSoLuongSachMuon() - muonSach.getSoLuong());
                sach.setSoLuongConLai(sach.getSoLuongConLai() + muonSach.getSoLuong());
            }
        }

        return muonSachRepository.save(muonSach);
    }

    @Override
    public void delete(Integer id) {
        muonSachRepository.deleteById(id);
    }
}
