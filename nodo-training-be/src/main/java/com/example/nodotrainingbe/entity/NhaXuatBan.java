package com.example.nodotrainingbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PHUONGTD_NHAXUATBAN")
public class NhaXuatBan implements Serializable {

    @Id
    @Column(name = "ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "nhaXuatBanSeq", sequenceName = "PHUONGTD_NHAXUATBAN_SEQ")
    private Integer id;

    @Column(name = "MA_NXB", unique = true, nullable = false)
    private Integer maNxb;

    @Column(name = "TEN_NXB", nullable = false, length = 100)
    private String tenNxb;

    @Column(name = "TRANG_THAI")
    private Integer trangThai;

    @Column(name = "DIA_CHI", length = 255)
    private String diaChi;

    @Column(name = "MO_TA", length = 255)
    private String moTa;

    @JsonIgnore
    @OneToMany(mappedBy = "nhaXuatBan", cascade = CascadeType.ALL)
    private List<Sach> sach;


}
