package com.walletBankingApp.walletbankingapp.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
//import org.springframework.security.core.userdetails.UserDetails;

@Document(collection = "User")
@Data
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private double amount;
}
