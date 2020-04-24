import React from 'react';
import ReactDOM from 'react-dom';
import AdminPage from './AdminPage';
import { isTsAnyKeyword } from '@babel/types';
import {cleanup} from "@testing-library/react"
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';


afterEach(cleanup);

describe('Render AdminPage', () => {
    it("should render AdminPage without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<AdminPage></AdminPage>, div);
    });
});

describe('AdminPage', () => {
    //const toggleSidebar = jesst.fn();
    let wrapper;
    beforeEach(( ) => {
        wrapper = mount(shallow(<AdminPage />).get(0));
    });

    it('renders', () => {
        expect(wrapper).not.toBeNull();
    });

    it('shoud toggle sidebar on', () => {
        expect(wrapper.state('drawerIsOpen')).toBe(false);
        wrapper.find('#Iconbutton').at(0).simulate('click');
        expect(wrapper.state('drawerIsOpen')).toBe(true);
    });

    it('should toggle public announcement', () => {
        expect(wrapper.state('dialogueOpen')).toBe(false);
        wrapper.find('#Iconbutton').at(0).simulate('click');
        wrapper.find('#post-announcement').at(0).simulate('click');
        expect(wrapper.state('dialogueOpen')).toBe(true);
    })

    it('should create data', () => {
        const instance = wrapper.instance();
        expect(instance.createData('name','content')).toStrictEqual({"content": "content","name": "name"});
        
    })

    it('should call update group number clicked', () => {
        const instance = wrapper.instance();
        instance.updateGrpNoClicked('group12');
        expect(wrapper.state('groupNoClicked')).toBe('group12');
        
    })
    
    it('should handle announcement', () => {
        const instance = wrapper.instance();
        instance.handleAnnouncement('announcement');
        expect(wrapper.state('announcement')).toBe('');
        
    })

    it('should close unregister dialogue', () => {
        const instance = wrapper.instance();
        instance.handleCloseUnregister();
        expect(wrapper.state('dialogueOpenUnregister')).toBe(false);
    })

    it('should toggle content', () => {
        const instance = wrapper.instance();
        instance.toggleContent();
        expect(wrapper.state('contentShow')).toBe(true);
    })
    
    it('should open unregister dialogue', () => {
        const instance = wrapper.instance();
        instance.handleClickOpenUnregister();
        expect(wrapper.state('dialogueOpenUnregister')).toBe(true);
    })

    it('should close private dialogue', () => {
        const instance = wrapper.instance();
        instance.handleClosePrivate();
        expect(wrapper.state('dialogueOpenPrivate')).toBe(false);
    })

    it('should open private dialogue', () => {
        const instance = wrapper.instance();
        instance.handleClickOpenPrivate();
        expect(wrapper.state('dialogueOpenPrivate')).toBe(true);
    })
    
    it('should close dialogue', () => {
        const instance = wrapper.instance();
        instance.handleClose();
        expect(wrapper.state('dialogueOpen')).toBe(false);
    })

    it('should open dialogue', () => {
        const instance = wrapper.instance();
        instance.handleClickOpen();
        expect(wrapper.state('dialogueOpen')).toBe(true);
    })
    
    


    

});


