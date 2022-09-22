package com.example.nodotrainingbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PHUONGTD_BANDOC")
public class BanDoc implements Serializable {

    @Id
    @Column(name = "ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "nhaXuatBanSeq", sequenceName = "PHUONGTD_PHUONGTD_BANDOC_SEQ")
    private Integer id;

    @Column(name = "MA_BAN_DOC", unique = true, nullable = false)
    private Integer maBanDoc;

    @Column(name = "TEN_BAN_DOC", nullable = false, length = 50)
    private String tenBanDoc;

    @Column(name = "SDT", unique = true, nullable = false, length = 12)
    private String sdt;

    @Column(name = "DIA_CHI", length = 100)
    private String diaChi;

    @Column(name = "NGAY_SINH")
    private LocalDateTime ngaySinh;

    @Column(name = "NGAY_TAO_TAI_KHOAN")
    private LocalDateTime ngayTaoTaiKhoan;

    @Column(name = "HANG")
    private Integer hang;

    @JsonIgnore
    @OneToMany(mappedBy = "banDoc", cascade = CascadeType.ALL)
    private List<MuonSach> listMuonSach;

}
