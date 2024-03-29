package com.example.reltyhubapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "BUILDS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Builds {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String houseType;
    private String title;
    private String description;
    private Float price;
    private Float square_footage;
    private Integer count_of_bedrooms;
    private Integer count_of_bathrooms;
    private String city;
    private String view;
    private Integer distance_to_beach;
    private Integer floor;
    private Integer number_of_stores;
    private String type_of_dev;
    private String geo;
    private String manager;
    private String contact;
    private boolean isPartner;
    private boolean isSold;
    private String typeDeal;
    private boolean hasLift;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true, mappedBy = "builds")
    private List<Image> imageList = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    private User user;
    private Long previewImageId;
    private LocalDateTime dateOfCreate;
    @PrePersist
    private void init() {
        dateOfCreate = LocalDateTime.now();
    }

    public void addImageToBuilds(Image image) {
        image.setBuilds(this);
        imageList.add(image);
    }

}
