import { async, TestBed} from '@angular/core/testing';
import { ApiServiceService } from './api-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IterableDiffers } from '@angular/core';
import { user } from '../model/user';
import { tripPost } from '../model/tripPost';
import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { trip } from '../model/trip';
import { tripStart } from '../model/tripStart';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { ratings } from '../model/ratings';
// "./jasmine-core/jasmine.js"
// import { Jasmine} from './jasmine-core';

describe('ApiServiceService', () => {

  let service :  ApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers should get all users array', async() => {
    let fakeData: user[] = [
      {
        id : 1,
        username : 'Larry',
        friends : []
      },
      {
        id : 2,
        username : 'Bob',
        friends : []
      }
    ]
    spyOn(service,'getUsers').and.returnValue(Promise.resolve(fakeData));

    await service.getUsers().then((res) => {
      expect(res.length).toEqual(2);
      expect(service.getUsers).toHaveBeenCalled();
 
    })
  });
  it('addReview should get a review', async() => {
    let fakeData: ratings = 
      {
        id: 1,
        userId: 4,
        tripId: 48,
        myRating: 5
      }
    
    spyOn(service,'addReview').and.returnValue(Promise.resolve(fakeData));

    await service.addReview(fakeData).then((res) => {
      expect(res).toEqual(fakeData);
      expect(service.addReview).toHaveBeenCalled();
 
    })
  });
  it('setTrip should return set trip', async () => {
    let fakeTrip  = {
      address: "5595 Grand Dr, St Louis, MO 63112",
      hours: 1,
      days: 4
  }
    spyOn(service,'setTrip').and.returnValue()
    await service.setTrip(fakeTrip)

      expect(service.setTrip).toHaveBeenCalled();

    
  });
  it('addFriend should return a user', async () => {
    let fakeUser =  {
      id : 1,
      userId: 2,
      friendId: 6
    }
    spyOn(service,'addFriend').and.returnValue(Promise.resolve(fakeUser));
    await service.addFriend(fakeUser).then((res) => {
      expect(res).toEqual(fakeUser);
      expect(service.addFriend).toHaveBeenCalled();
    })
  });
  it('getOneUser should return a user', async () => {
    let fakeUser: user =  {
      id : 1,
      username : 'Larry',
      friends : []
    }
    spyOn(service,'getOneUser').and.returnValue(Promise.resolve(fakeUser));
    await service.getOneUser(1).then((res) => {
      expect(res).toEqual(fakeUser);
      expect(service.getOneUser).toHaveBeenCalled();
    })
  });
  it('addTrip should return a trip', async () => {
      let fakeTrip  = {
        id:1,
       username: "Larry",
        startAddress: "5595 Grand Dr, St Louis, MO 63112",
        endAddress: "2020 S W East Dr",
        startLat: 0.420453866,
        startLong: -0.714322323e2,
        endLat: 0.420453866e2,
        endLong: -0.8356078468263034,
        rating: []
    }
    spyOn(service, 'addTrip').and.returnValue(Promise.resolve(fakeTrip));
    await service.addTrip(fakeTrip).then((res) => {
      expect(service.addTrip).toHaveBeenCalled();
      expect(res).toEqual(fakeTrip);
    })
  });
  it('getPOIs should return an array of addresses', async () => {
    let fakeTrip  = {
      address: "5595 Grand Dr, St Louis, MO 63112",
      hours: 1,
      days: 4
  }
  spyOn(service, 'getPOIs').and.returnValue(Promise.resolve([]));
  await service.getPOIs(fakeTrip).then((res) => {
    expect(service.getPOIs).toHaveBeenCalled();
    expect(res.length).toEqual(0);
  })
});
it('addUser should call user', async () => {
  let fakeUser: user =  {
    id : 1,
    username : 'Larry',
    friends : []
  }
  spyOn(service, 'addUser');
  await service.addUser(fakeUser);
  expect(service.addUser).toHaveBeenCalled();
    // expect(res.length).toEqual(0);
  
});
it('getRouteOptions should return two addresses', async () => {
  let fakeTrip  = {
    address: "5595 Grand Dr, St Louis, MO 63112",
    hours: 1,
    days: 4
}
spyOn(service, 'getRouteOptions').and.returnValue(Promise.resolve([]));
await service.getRouteOptions(fakeTrip).then((res) => {
  expect(service.getRouteOptions).toHaveBeenCalled();
  expect(res.length).toEqual(0);
})
});
it('getTrips should get all trips', async() => {
  let fakeData: trip[] = [
    {
      id : 1,
      username: "Larry",
      startAddress: "5595 Grand Dr, St Louis, MO 63112",
      endAddress: "Jerseyville Jersey Township Jersey County IL US 62052",
      rating: 4
    },
    {
      id : 2,
      username : 'Bob',
      startAddress: "5595 Grand Dr, St Louis, MO 63112",
      endAddress: "St Morgan Helvetia Township Madison County IL US 62293",
      rating: 5
    }
  ]
  spyOn(service,'getTrips').and.returnValue(Promise.resolve(fakeData));

  await service.getTrips().then((res) => {
    expect(res.length).toEqual(2);
    expect(service.getTrips).toHaveBeenCalled();

  })
});
it('getTrip should return a trip', async() => {
  let fakeData: tripStart = {
    address: "5595 Grand Dr, St Louis, MO 63112",
    hours: 1,
    days: 4
  }
    

  spyOn(service,'getTrip');

  await service.getTrip()

    expect(service.getTrip).toHaveBeenCalled();
    // expect(service.getTrip()).toEqual(fakeData);
});
})
