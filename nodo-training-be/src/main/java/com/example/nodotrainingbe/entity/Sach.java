package com.example.nodotrainingbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PHUONGTD_SACH")
public class Sach implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "sachSeq", sequenceName = "PHUONGTD_PHUONGTD_SACH_SEQ")
    @Column(name = "ID", unique = true, nullable = false)
    private Integer id;

    @Column(name = "MA_SACH", unique = true, nullable = false)
    private Integer maSach;

    @Column(name = "CHU_DE", nullable = false, length = 50)
    private String chuDe;

    @Column(name = "NAM_XUAT_BAN")
    private LocalDateTime namXuatBan;

    @Column(name = "MO_TA")
    private String moTa;

    @Column(name = "SO_LUONG_CON_LAI")
    private Integer soLuongConLai;

    @Column(name = "SO_LUONG_SACH_MUON")
    private Integer soLuongSachMuon;

    @Column(name = "TONG_SO_SACH")
    private Integer tongSoSach;

    @Column(name = "TEN_SACH", length = 100)
    private String tenSach;

    @JsonIgnore
    @OneToMany(mappedBy = "sach", cascade = CascadeType.ALL)
    private List<MuonSach> listMuonSach;

    @ManyToOne
    @JoinColumn(name = "MA_TAC_GIA")
    private TacGia tacGia;

    @ManyToOne
    @JoinColumn(name = "MA_NXB")
    private NhaXuatBan nhaXuatBan;

}
