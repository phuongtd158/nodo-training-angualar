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
@Table(name = "PHUONGTD_TACGIA")
public class TacGia implements Serializable {
    @Id
    @Column(name = "ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "tacGiaSeq", sequenceName = "PHUONGTD_PHUONGTD_TACGIA_SEQ")
    private Integer id;

    @Column(name = "MA_TAC_GIA", unique = true, nullable = false)
    private Integer maTacGia;

    @Column(name = "TEN_TAC_GIA", nullable = false, length = 100)
    private String tenTacGia;

    @Column(name = "SDT", unique = true, nullable = false, length = 12)
    private String sdt;

    @Column(name = "DIACHI", length = 255)
    private String diachi;

    @Column(name = "MOTA", length = 255)
    private String mota;

    @JsonIgnore
    @OneToMany(mappedBy = "tacGia", cascade = CascadeType.ALL)
    private List<Sach> listSach;

}
