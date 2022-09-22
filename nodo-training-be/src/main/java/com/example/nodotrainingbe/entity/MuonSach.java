package com.example.nodotrainingbe.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PHUONGTD_MUONSACH")
public class MuonSach implements Serializable {

    @Id
    @Column(name = "ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "nhaXuatBanSeq", sequenceName = "PHUONGTD_PHUONGTD_MUONSACH_SEQ")
    private Integer id;

    @Column(name = "SO_LUONG")
    private Integer soLuong;

    @Column(name = "NGAY_GIO_MUON")
    private LocalDateTime ngayGioMuon;

    @Column(name = "NGAY_GIO_TRA")
    private LocalDateTime ngayGioTra;

    @Column(name = "TRANG_THAI")
    private Integer trangThai;

    @Column(name = "GHI_CHU", length = 100)
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "MA_BAN_DOC")
    private BanDoc banDoc;

    @ManyToOne
    @JoinColumn(name = "MA_SACH")
    private Sach sach;

    @Override
    public String toString() {
        return "MuonSach{" +
                "id=" + id +
                ", soLuong=" + soLuong +
                ", ngayGioMuon=" + ngayGioMuon +
                ", ngayGioTra=" + ngayGioTra +
                ", trangThai=" + trangThai +
                ", ghiChu='" + ghiChu + '\'' +
                ", banDoc=" + banDoc +
                ", sach=" + sach +
                '}';
    }
}
