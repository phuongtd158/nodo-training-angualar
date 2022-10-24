package com.example.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "option_set")
public class OptionSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false, length = 30, unique = true)
    private String code;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "effective_date")
    private Date effectiveDate;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "updated_date", length = 45)
    private Date updatedDate;

    @Column(name = "creator", length = 45)
    private String creator;

    @Column(name = "status")
    private Integer status;

    @JsonIgnore
    @OneToMany(mappedBy = "optionSet")
    private List<OptionSetValue> listOptionSetValues;
}