package com.example.nodotrainingbe.service.impl;

import com.example.nodotrainingbe.entity.Sach;
import com.example.nodotrainingbe.exception.BookTotalException;
import com.example.nodotrainingbe.exception.ExistException;
import com.example.nodotrainingbe.exception.ResourceNotFoundException;
import com.example.nodotrainingbe.repository.SachRepository;
import com.example.nodotrainingbe.service.SachService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SachServiceImpl implements SachService {

    private static final Logger LOGGER = Logger.getLogger(SachServiceImpl.class);
    private final SachRepository sachRepository;

    public SachServiceImpl(SachRepository sachRepository) {
        this.sachRepository = sachRepository;
    }


    @Override
    public Sach save(Sach sach) {
        Optional<Sach> sachByMaSach = sachRepository.findSachByMaSachEquals(sach.getMaSach());
        List<Sach> list = getAll();
        if (sachByMaSach.isPresent()) {
            throw new ExistException("Sách có mã " + sach.getMaSach() + " đã tồn tại");
        }

        if (list.size() == 0) {
            sach.setMaSach(1);
        } else {
            sach.setMaSach(list.get(list.size() - 1).getMaSach() + 1);
        }

        sach.setSoLuongConLai(sach.getTongSoSach());
        LOGGER.info("Thêm sách thành công " + sach);
        return sachRepository.save(sach);
    }

    @Override
    public Sach get(Integer id) {
        return sachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách có mã: " + id));
    }

    @Override
    public List<Sach> getAll() {
        return sachRepository.findAll();
    }

    @Override
    public Sach update(Sach sach) {

        if (sach.getTongSoSach() < sach.getSoLuongSachMuon()) {
            throw new BookTotalException("Tổng sách không được nhỏ hơn số lượng đang mượn");
        }

        sach.setSoLuongConLai(sach.getTongSoSach() - sach.getSoLuongSachMuon());
        return sachRepository.save(sach);
    }

    @Override
    public void delete(Integer id) {
        sachRepository.deleteById(id);
    }
}
