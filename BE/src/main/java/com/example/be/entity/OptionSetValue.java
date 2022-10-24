package com.example.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "option_set_value")
public class OptionSetValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "option_set_id", referencedColumnName = "id")
    private OptionSet optionSet;

    @Column(name = "code", nullable = false, length = 45, unique = true)
    private String code;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "`group`", nullable = false, length = 45)
    private String group;

    @Column(name = "effective_date")
    private Date effectiveDate;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "updated_date")
    private Date updatedDate;

    @Column(name = "creator", length = 45)
    private String creator;

    @Column(name = "status")
    private Integer status;
}