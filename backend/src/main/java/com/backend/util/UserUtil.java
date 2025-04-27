package com.backend.util;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import com.backend.model.User;


public class UserUtil {

		public static void sortUserByNumberOfPost(List<User> users) {
		    Comparator<User> comparator = new Comparator<User>() {
		      @Override
		      public int compare(User u1, User u2) {
		        int follower1=u1.getFollower().size();
		        int follower2 = u2.getFollower().size();
		        return follower2 - follower1;
		      }
		    };
		    Collections.sort(users, comparator);
		}	
}
